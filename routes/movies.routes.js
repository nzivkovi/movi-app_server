import { Router } from "express";
import { insertMovie, getMovie, getMovies, deleteMovie, 
    getMoviesSortedByTitleAlphabetically, getMoviesSortedByPublicationYearDescending,
    getMoreMovies, updateMovie } 
    from "../controllers/movies.controller.js";

const router = Router()

router.get("/", async (req, res) => {
    res.send(await getMovies(req.query.searchField));
})

router.get("/sortedByTitleAlphabetically", async (req, res) => {
    res.send(await getMoviesSortedByTitleAlphabetically(req.query.searchField));    
})

router.get("/sortedByPublicationYearDescending", async (req, res) => {
    res.send(await getMoviesSortedByPublicationYearDescending(req.query.searchField));    
})

router.get("/onScrollDown", async (req, res) => {
    res.send(await getMoreMovies(req.query.searchField));    
})

router.get("/:id", async (req, res) => {
    res.send(await getMovie(req.params.id));
})

router.post("/", async (req, res) => {
    res.send(await insertMovie(req.body));
})

router.put("/:id", async (req, res) => {
    const response = await updateMovie(req.params.id, req.body); 
    res.status(response.StatusCode).send(response.Body);
})

router.delete("/:id", async (req, res) => {
    const response = await deleteMovie(req.params.id);
    res.status(response.StatusCode).send(response.Body);
})

export default router