export default function Card({ title, url, explanation, date}) {
    
        return (
            <div>
                <h3>{title}</h3>
                <img style={{maxWidth: "60%", display: "block"}} src={url} />
                <button>Like</button>
                
                <button>View on NASA</button>
                <p style={{ 
                            width: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            
                            }}>{explanation}</p>
                <p>{date}</p>
            </div>
            
        )
    
}