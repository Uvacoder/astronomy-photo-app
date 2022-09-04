import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import rocket from "../icons/rocket.svg"

export default function Card({ title, url, explanation, date}) {
    
        return (
            <div>
                <h3 className="text-lg">{title}</h3>
                <img 
                    style={{maxWidth: "60%", display: "block"}} 
                    data-src={url} 
                    className="lozad"
                    />
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={heartEmpty} />
                </button>
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={heartSolid} />
                </button>
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={rocket} />
                </button>
                
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