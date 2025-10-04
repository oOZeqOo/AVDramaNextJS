import { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={styles.tooltip_container}>
      <div
        style={styles.tooltip_trigger}
        onClick={() => setShowTooltip(!showTooltip)}
        // onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && <div style={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;

const styles = {
  tooltip_container: {
    position: 'relative',
    display: 'flex',
  },

  tooltip: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem',
    backgroundColor: ' #333',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '4px',
    zIndex: '1',
  },

  tooltip_trigger: {
    cursor: 'pointer',
    display: 'flex',
    // alignSelf: "center",
  },
};
