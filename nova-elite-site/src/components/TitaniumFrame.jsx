import './TitaniumFrame.css';

export default function TitaniumFrame() {
  return (
    <div className="titanium-frame">
      <div className="tf-edge-tl" />
      <div className="tf-edge-tr" />
      <div className="tf-edge-bl" />
      <div className="tf-edge-br" />

      <div className="tf-frame">
        <div className="tf-side tf-side-left">
          <div className="tf-brush" />
        </div>
        <div className="tf-body">
          <div className="tf-cutout-top" />
          <div className="tf-cutout-bottom" />
          <div className="tf-bevel-hi" />
          <div className="tf-bevel-lo" />
        </div>
        <div className="tf-side tf-side-right">
          <div className="tf-brush" />
        </div>
      </div>

      <div className="tf-callouts">
        <div className="tf-callout tf-callout-1">
          <span className="tf-label">Material</span>
          <span className="tf-value">Ti-6Al-4V · Grade 5</span>
        </div>
        <div className="tf-callout tf-callout-2">
          <span className="tf-label">Finish</span>
          <span className="tf-value">120-grit brushed</span>
        </div>
        <div className="tf-callout tf-callout-3">
          <span className="tf-label">Edge</span>
          <span className="tf-value">0.2mm micro-bevel</span>
        </div>
      </div>
    </div>
  );
}
