import { useContext } from "react"
import { ContainerContext } from "../App"
import Container1 from "../components/Container1"

export default function Likes() {

    const containerData = useContext(ContainerContext);
    console.log(containerData)
    console.log(containerData?.feedView)

    return(
        <>
        <Container1 containerData={containerData}/>
        </>
    )
}