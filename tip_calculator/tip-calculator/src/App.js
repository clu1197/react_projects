import { useState } from "react";

export default function App() {
  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>💸 Tip Splitter</h1>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip1 = (bill * percentage1) / 100;
  const tip2 = (bill * percentage2) / 100;
  const splitBill = bill / 2;
  const yourTotal = splitBill + tip1;
  const friendTotal = splitBill + tip2;
  const total = yourTotal + friendTotal;

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div style={styles.card}>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage
        percentage={percentage1}
        onSetPercentage={setPercentage1}
      >
        How would <strong>you</strong> like to tip?
      </SelectPercentage>
      <SelectPercentage
        percentage={percentage2}
        onSetPercentage={setPercentage2}
      >
        How would <strong>your friend</strong> like to tip?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output
            yourTotal={yourTotal}
            friendTotal={friendTotal}
            total={total}
            tip1={tip1}
            tip2={tip2}
            splitBill={splitBill}
          />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div style={styles.inputGroup}>
      <label>💰 Bill Amount</label>
      <input
        type="number"
        placeholder="Enter bill amount"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
        style={styles.input}
      />
    </div>
  );
}

function SelectPercentage({ percentage, onSetPercentage, children }) {
  return (
    <div style={styles.inputGroup}>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
        style={styles.select}
      >
        <option value="0">No Tip (0%)</option>
        <option value="5">5% Tip</option>
        <option value="10">10% Tip</option>
        <option value="12">12% Tip</option>
        <option value="18">18% Tip</option>
        <option value="20">20% Tip</option>
      </select>
    </div>
  );
}

function Output({ yourTotal, friendTotal, total, tip1, tip2, splitBill }) {
  return (
    <div style={styles.outputWrapper}>
      <div style={styles.outputSection}>
        <h3 style={styles.sectionTitle}>🧍 You</h3>
        <div style={styles.row}>
          <span>Bill Share:</span>
          <span>${splitBill.toFixed(2)}</span>
        </div>
        <div style={styles.row}>
          <span>Your Tip:</span>
          <span>${tip1.toFixed(2)}</span>
        </div>
        <div style={{ ...styles.row, ...styles.totalRow }}>
          <strong>Total You Pay:</strong>
          <strong>${yourTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div style={styles.outputSection}>
        <h3 style={styles.sectionTitle}>🧑‍🤝‍🧑 Your Friend</h3>
        <div style={styles.row}>
          <span>Bill Share:</span>
          <span>${splitBill.toFixed(2)}</span>
        </div>
        <div style={styles.row}>
          <span>Friend's Tip:</span>
          <span>${tip2.toFixed(2)}</span>
        </div>
        <div style={{ ...styles.row, ...styles.totalRow }}>
          <strong>Total Friend Pays:</strong>
          <strong>${friendTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div style={styles.totalBlock}>
        <h3>Total Paid: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div style={styles.resetContainer}>
      <button onClick={onReset} style={styles.resetButton}>
        Reset Calculator
      </button>
    </div>
  );
}

// 💅 Inline styling
const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  outputWrapper: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  outputSection: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "1.5rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },

  sectionTitle: {
    marginBottom: "1rem",
    borderBottom: "1px solid #eee",
    paddingBottom: "0.5rem",
    fontSize: "1.2rem",
    color: "#2c3e50",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },

  totalRow: {
    marginTop: "1rem",
    fontWeight: "bold",
    color: "#2c3e50",
  },

  totalBlock: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#e9f5ff",
    borderRadius: "8px",
    border: "1px solid #cfe4f3",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#1a5276",
  },

  resetContainer: {
    marginTop: "1.5rem",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  resetContainer: {
    marginTop: "2rem",
    textAlign: "center",
  },

  resetButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },

  // Add a hover and active state for better interaction
  resetButtonHover: {
    backgroundColor: "#c0392b",
  },

  resetButtonActive: {
    transform: "scale(0.98)",
  },
};
