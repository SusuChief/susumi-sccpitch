

## Plan: Add Deep Dive Analysis (Audio) and Video Presentation Sections

### Placement in Page Flow

```text
HowItWorks ("Why This Model Works")
  ↓
NEW: DeepDiveAnalysis (podcast audio via YouTube embed)
  ↓
Products
Tokenomics
Investment
Growth
Competitive
  ↓
NEW: RevenueAnalysis (self-hosted video presentation)
  ↓
Roadmap
Team
Risks
Closing
```

### Section 1: Deep Dive Analysis (Audio)
- New component: `src/components/sections/DeepDiveAnalysis.tsx`
- Styled card with a stock podcast microphone image (from Unsplash/Pexels or a placeholder)
- Title: "Deep Dive Analysis"
- "Click To Play" overlay text on the image
- On click, reveals a YouTube iframe embed for the audio
- Tracks section view via existing analytics pattern

### Section 2: Revenue Analysis (Video)
- New component: `src/components/sections/RevenueAnalysis.tsx`
- Video file copied to `public/videos/The_Susumi_Real-Yield_Engine_2.mp4`
- Shows a thumbnail (generated from video first frame or a styled poster)
- Video autoplays (muted, as browsers require) when section enters viewport or on hover
- Native HTML5 video controls shown during playback
- Tracks section view via existing analytics pattern

### File Changes
1. Copy uploaded video to `public/videos/`
2. Create `src/components/sections/DeepDiveAnalysis.tsx`
3. Create `src/components/sections/RevenueAnalysis.tsx`
4. Update `src/pages/Home.tsx` to import and place both sections

### Clarification Needed
**YouTube link**: Please provide the YouTube URL for the podcast audio so I can embed it in the Deep Dive Analysis section.

### Technical Notes
- Video autoplay requires `muted` attribute (browser policy). Audio will unmute when user interacts with controls.
- The uploaded MP4 (~video file) will be served from the `public/` directory for self-hosting.
- For the podcast microphone image, I will use a high-quality stock image URL unless you prefer to upload a specific image.

