import './CameraDetail.css';

export default function CameraDetail() {
  return (
    <div className="camera-detail">
      <div className="camera-module-large">
        <div className="cam-lens cam-lens-1">
          <div className="cam-ring" />
          <div className="cam-glass" />
          <div className="cam-coating" />
        </div>
        <div className="cam-lens cam-lens-2">
          <div className="cam-ring" />
          <div className="cam-glass" />
          <div className="cam-coating" />
        </div>
        <div className="cam-lens cam-lens-3">
          <div className="cam-ring" />
          <div className="cam-glass" />
          <div className="cam-coating" />
        </div>
        <div className="cam-lidar" />
        <div className="cam-flash" />
      </div>

      <div className="camera-grid-lines">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="camera-callouts">
        <div className="callout callout-1">
          <span className="callout-label">PERISCOPE</span>
          <span className="callout-value">120mm · f/3.0</span>
        </div>
        <div className="callout callout-2">
          <span className="callout-label">MAIN</span>
          <span className="callout-value">24mm · f/1.78 · 1" sensor</span>
        </div>
        <div className="callout callout-3">
          <span className="callout-label">ULTRA-WIDE</span>
          <span className="callout-value">13mm · f/2.2 · 120°</span>
        </div>
      </div>
    </div>
  );
}
