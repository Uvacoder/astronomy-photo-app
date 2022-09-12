import { useContext } from "react"
import { ContainerContext } from "../App"
import Container1 from "../components/Container1"

export default function Likes() {

    const containerData = useContext(ContainerContext);
    
    return(
        <>
        <Container1 containerData={containerData}/>
        </>
    )
}