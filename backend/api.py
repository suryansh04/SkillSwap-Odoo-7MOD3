from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer, util
import uvicorn

# === FastAPI app setup ===
app = FastAPI()

# === Enable CORS for frontend access ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load the SentenceTransformer model ===
print("🔄 Loading model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# === Connect to MongoDB Atlas ===
print("📡 Connecting to MongoDB Atlas...")
MONGO_URI = "mongodb+srv://testUser:testPass123@skillswapcluster.fatzjmr.mongodb.net/skill_swap?retryWrites=true&w=majority&appName=SkillSwapCluster"
client = MongoClient(MONGO_URI)
db = client["skill_swap"]
users_col = db["users"]

# === API Route ===
@app.get("/find-match")
def find_best_match():
    print("📥 API called: /find-match")

    # Logged-in user email for testing
    logged_in_email = "john@example.com"
    print(f"🔍 Looking up user: {logged_in_email}")

    user = users_col.find_one({"email": logged_in_email})
    if not user:
        print("❌ User not found.")
        return {"error": "User not found"}

    skills_wanted = ", ".join(user.get("skillsWanted", []))
    if not skills_wanted:
        print("⚠️ No skillsWanted found for this user.")
        return {"error": "No skillsWanted listed."}

    print("🧠 Embedding wanted skills...")
    wanted_vector = model.encode(skills_wanted, convert_to_tensor=True)

    print("📡 Searching for public users...")
    other_users = list(users_col.find({
        "_id": {"$ne": user["_id"]},
        "profileVisibility": "Public"
    }))

    best_match = None
    highest_score = -1.0

    print("🔎 Comparing skill embeddings...")
    for other in other_users:
        offered_skills = ", ".join(other.get("skillsOffered", []))
        if not offered_skills.strip():
            continue

        offered_vector = model.encode(offered_skills, convert_to_tensor=True)
        score = util.cos_sim(wanted_vector, offered_vector).item()

        print(f"→ Compared with {other['name']}, Score: {round(score, 4)}")

        if score > highest_score:
            highest_score = score
            best_match = other

    if best_match:
        print(f"✅ Best match: {best_match['name']} (Score: {round(highest_score, 4)})")
        return {
            "name": best_match["name"],
            "email": best_match["email"],
            "skillsOffered": best_match.get("skillsOffered", []),
            "skillsWanted": best_match.get("skillsWanted", []),
            "availability": best_match.get("availability", "anytime"),
            "similarity": round(highest_score, 4)
        }

    print("❌ No suitable match found.")
    return {"error": "No suitable match found."}


# === Start the server ===
if __name__ == "__main__":
    print("🚀 Starting FastAPI server...")
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
