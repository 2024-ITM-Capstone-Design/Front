import React, { useEffect } from "react";
import axios from "axios";
interface ApiResponse {
  status: string;
  generationTime: number;
  id: number;
  output: string[];
  proxy_links: string[];
  meta: {
    base64: string;
    enhance_prompt: string;
    enhance_style: string | null;
    file_prefix: string;
    guidance_scale: number;
    height: number;
    instant_response: string;
    n_samples: number;
    negative_prompt: string;
    outdir: string;
    prompt: string;
    safety_checker: string;
    safety_checker_type: string;
    seed: number;
    temp: string;
    width: number;
  };
}
function CreateImg() {
  const handleGenerate = async () => {
    try {
      const res = await axios.post<ApiResponse>(
        "https://modelslab.com/api/v6/realtime/text2img",
        {
          key: "p5xBWZEvR24HYwidQtfl1m4bj2jlqCCtUfgVZjkCH6bKB4ZcnL3aKm6PYCW3",
          prompt:
            "Draw a solitary figure standing in a dark room, surrounded by shadows and whispers of hurtful words. The figure's body is tense, but their face is determined, lit up with a brief glimmer of hope. In the corner, a bed sits empty, representing the sleepless nights filled with fear and anxiety. Above, a stormy sky looms, reflecting the turmoil in the figure's heart. Captured in the stillness of the moment, the figure remains motionless, afraid to succumb to the darkness but equally afraid to reach for the light. ",
          negative_prompt:
            "Signature, Poor body structure, Low-quality drawing, Incorrect size, Outside the edges, Unclear, Dull background, Logo, Cropped, Trimmed, Body parts separated, Uneven size, Twisted, Copy, Duplicated elements, Additional arms, fingers, hands, legs, Additional body parts, Flaw, Imperfection, Joined fingers, Unpleasant size, Identifying sign, Incorrect structure, Wrong proportion, Tacky, Poor quality, Poor clarity, Spot, Absent arms, fingers, hands, legs, Error, Damaged, Beyond the image, Badly drawn face, feet, hands, Text on paper, Repulsive, Unpleasant size, Shortened, Narrow eyes, Visual plan, Arrangement, Cut off, Unpleasant, Blurry, Unattractive, Awkward position, Imaginary framework, Watermark",
          width: "512",
          height: "512",
          safety_checker: false,
          seed: null,
          samples: 1,
          base64: false,
          webhook: null,
          track_id: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === "success") {
        const outputUrl = res.data.output[0]; // 첫 번째 URL을 가져옵니다.

        if (outputUrl) {
          window.open(outputUrl, "_blank"); // 새 탭에서 링크를 엽니다.
        } else {
          console.log("No output URL found.");
        }
      } else {
        console.log("API request was not successful.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <button onClick={handleGenerate}>CreateImg</button>;
}

export default CreateImg;
