# Color Images Guide

## How to Use Your Own Phone Images

The `ColorShowcase` component now uses images instead of 3D models for better performance.

### Option 1: Use Local Images

1. **Create an images folder:**
   ```
   nova-elite-site/
   ├── public/
   │   ├── phones/
   │   │   ├── obsidian.png
   │   │   ├── titanium.png
   │   │   ├── arctic.png
   │   │   ├── desert.png
   │   │   └── ocean.png
   ```

2. **Update the COLORS array in `ColorShowcase.jsx`:**
   ```javascript
   const COLORS = [
     {
       id: 'obsidian',
       name: 'Midnight Obsidian',
       hex: '#0D0D0D',
       description: 'Deepest black',
       image: '/phones/obsidian.png', // Local path
     },
     // ... more colors
   ];
   ```

### Option 2: Use External URLs (Current Setup)

The component currently uses Unsplash images as placeholders. Replace with your own hosted images:

```javascript
image: 'https://your-cdn.com/phones/obsidian.png',
```

### Option 3: Use Base64 Data URIs

For small images, you can embed them directly:

```javascript
image: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
```

## Image Specifications

For best results, your phone images should be:

- **Format:** PNG with transparent background (or WEBP for smaller size)
- **Dimensions:** 800x1600px (2:1 aspect ratio)
- **File size:** Under 200KB per image (use compression)
- **Background:** Transparent or solid color matching the phone finish
- **Angle:** Front-facing, slight 3D perspective (optional)

## Performance Tips

1. **Lazy loading:** Already enabled with `loading="lazy"` attribute
2. **Optimize images:** Use tools like TinyPNG or ImageOptim
3. **Use WebP:** Convert PNG to WebP for 25-35% smaller files
4. **CDN:** Host images on a CDN for faster loading

## Generating Phone Renders

You can use:
- **Blender:** 3D software for photo-realistic renders
- **Figma/Sketch:** For flat/minimal phone mockups
- **Online tools:** Mockup generators like Smartmockups, Shotsnapp
- **AI:** Midjourney, DALL-E for creative renders

## Example Blender Setup

1. Import phone 3D model
2. Set up studio lighting (3-point lighting)
3. Apply materials for each color
4. Render at 800x1600px with transparent background
5. Export as PNG

---

**Current Status:** Using placeholder images from Unsplash. Replace with actual NOVA Elite phone renders for production.
