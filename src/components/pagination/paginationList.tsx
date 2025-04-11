import "../../assets/pagination.scss"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import ArrowLeft3 from "../../assets/icon/arrowRight3"
import ArrowRight2 from "../../assets/icon/arrowRight2"


type dataType<T=any> = {
    dataParPage : number    //nombre d'éléments à afficher par page (on veut afficher 5 éléments par page par exemple)
    data : T[]   //toute la liste des données (articles, livres, etc.)
    dataActuel : (data : T[]) =>void    //fonction pour mettre à jour les données visibles (slice de la liste)
    setStatus : (status: boolean)=>void      //flag pour savoir si la pagination est en cours
}

const Pagination = <T,>({dataParPage,data,setStatus , dataActuel}:dataType<T>) =>{

    const [currentPage , setCurrentPage] = useState(0)      //Page actuelle (commence à 0 → première page)

    const offset = currentPage * dataParPage    //Déterminer l’index du premier élément de la page en cours dans le tableau global data. (offseet = 0 * 5)
    const currentData = data.slice(offset , offset + dataParPage)   //Extraire la tranche de données correspondant à la page actuelle (currentData = [0,1,2,3,4])
    const pageCount = Math.ceil(data.length / dataParPage)  //elle sert à calculer combien de pages il te faut au total pour afficher tous tes éléments, en fonction du nombre d'éléments que tu veux montrer par page (dataPerPage).

    const handleSelectPage = ({selected} : any) =>{
        setStatus(true)
        setCurrentPage(selected)
    }

    useEffect(()=>{
        dataActuel(currentData)
    },[currentPage])

    return(
        <>
            <ReactPaginate
            onPageChange={handleSelectPage}
            previousLabel={<ArrowLeft3 />}
            nextLabel={<ArrowRight2 />}
            pageCount={pageCount}
            breakLabel={'...'}
            breakClassName="label"
            containerClassName="pagination-container"
            previousClassName="pagination-previous"
            nextClassName="pagination-next"
            disabledClassName="disabled-page"
            pageClassName="pagination-page"
            activeClassName="active-page"
            />
        </>
    )
}

export default Pagination