export default function Card({ title, url, explanation, date}) {
    
        return (
            <div>
                <h3 className="text-lg">{title}</h3>
                <img 
                    style={{maxWidth: "60%", display: "block"}} 
                    data-src={url} 
                    className="lozad"
                    />
                <button className="btn">Like</button>
                
                <button className="btn">View on NASA</button>
                <p style={{ 
                            width: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            
                            }}>{explanation}</p>
                <p className="mb-8">{date}</p>
            </div>
            
        )
    
}