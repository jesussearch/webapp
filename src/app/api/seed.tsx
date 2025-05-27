// seed-evidences.tsx
import fetch from "node-fetch";

type Media = {
  type: string;
  url: string;
  caption?: string;
};

type TextAttachment = {
  title: string;
  content: string;
};

type Evidence = {
  code: string;
  type: string;
  title: string;
  description: string;
  tags: string;
  media: Media[];
  texts: TextAttachment[];
};

const API_URL = "http://localhost:3000/api/evidences";
const types = ["A", "B", "C", "D"];
const TOTAL_PER_TYPE = 50;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateEvidence = (i: number, type: string): Evidence => ({
  code: `${type}-${i}`,
  type,
  title: `Title ${type}-${i}`,
  description: `Description for ${type}-${i}`,
  tags: `tag-${type.toLowerCase()},example`,
  media: [],
  texts: [],
});

const seed = async () => {
  for (const type of types) {
    for (let i = 1; i <= TOTAL_PER_TYPE; i++) {
      const evidence = generateEvidence(i, type);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(evidence),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `❌ Failed to create ${evidence.code}: ${res.status} ${errorText}`
          );
        } else {
          console.log(`✅ Created ${evidence.code}`);
        }

        await sleep(10); // Slight delay to avoid overwhelming server
      } catch (err) {
        console.error(`❌ Network error on ${evidence.code}:`, err);
      }
    }
  }

  console.log("🎉 Seeding completed.");
};

seed();
