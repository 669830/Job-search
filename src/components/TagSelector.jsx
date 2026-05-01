export default function TagSelector({options, selected, onToggle}){
    return(
        <div style = {{display: "flex", flexWrap:"wrap", gap:"8px"}}>
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => onToggle(opt)}
                    style={{
                        padding: "6px 14px",
                        borderRadius: "100px",
                        fontSize: "13px",
                        cursor: "pointer",
                        border: selected.includes(opt) ? "1px solid #378add" : "1px solid #e0e0e0",
                        background: selected.includes(opt) ? "#e6f1fb" : "#f9f9f9",
                        color: selected.includes(opt) ? "#0c447c" : "#555",
                        fontFamily: "inherit",
                    }}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}