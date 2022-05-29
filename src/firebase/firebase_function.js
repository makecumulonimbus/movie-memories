import firebaseApp from "../firebase/firebase_app.js"

const dashboardRef = firebaseApp.firestore().doc("dashboard/tD4U01fWZfmfrh4eSFIv")

var updateDashboard = {
    //Main Page
    addMainData(datas, type) {
        dashboardRef.get().then(querySnap => {
            if (type == 'movie') {
                var movieStatusRef = querySnap.data().movie
                dashboardRef.update({
                    "movie.movie_watched": datas.status == 'watched' ? movieStatusRef.movie_watched + 1 : movieStatusRef.movie_watched,
                    "movie.movie_wanted": datas.status == 'wanted' ? movieStatusRef.movie_wanted + 1 : movieStatusRef.movie_wanted
                })
            } else if (type == 'series') {
                var seriesStatusRef = querySnap.data().series
                dashboardRef.update({
                    "series.series_watched": datas.status == 'watched' ? seriesStatusRef.series_watched + 1 : seriesStatusRef.series_watched,
                    "series.series_wanted": datas.status == 'wanted' ? seriesStatusRef.series_wanted + 1 : seriesStatusRef.series_wanted
                })
            }
            else if (type == 'anime') {
                var animeStatusRef = querySnap.data().anime
                dashboardRef.update({
                    "anime.anime_watched": datas.status == 'watched' ? animeStatusRef.anime_watched + 1 : animeStatusRef.anime_watched,
                    "anime.anime_wanted": datas.status == 'wanted' ? animeStatusRef.anime_wanted + 1 : animeStatusRef.anime_wanted
                })
            }
        })
    },
    editMainData(oldData, datas, type) {
        dashboardRef.get().then(querySnap => {
            if (type == 'movie') {
                var movieStatusRef = querySnap.data().movie
                if (oldData.status == 'wanted' && datas.status == 'watched') {
                    dashboardRef.update({
                        "movie.movie_watched": movieStatusRef.movie_watched + 1,
                        "movie.movie_wanted": movieStatusRef.movie_wanted - 1
                    })
                } else if (oldData.status == 'watched' && datas.status == 'wanted') {
                    dashboardRef.update({
                        "movie.movie_watched": movieStatusRef.movie_watched - 1,
                        "movie.movie_wanted": movieStatusRef.movie_wanted + 1
                    })
                }
            } else if (type == 'series') {
                var seriesStatusRef = querySnap.data().series
                if (oldData.status == 'wanted' && datas.status == 'watched') {
                    dashboardRef.update({
                        "series.series_watched": seriesStatusRef.series_watched + 1,
                        "series.series_wanted": seriesStatusRef.series_wanted - 1
                    })
                } else if (oldData.status == 'watched' && datas.status == 'wanted') {
                    dashboardRef.update({
                        "series.series_watched": seriesStatusRef.series_watched - 1,
                        "series.series_wanted": seriesStatusRef.series_wanted + 1
                    })
                }
            }
            else if (type == 'anime') {
                var animeStatusRef = querySnap.data().anime
                if (oldData.status == 'wanted' && datas.status == 'watched') {
                    dashboardRef.update({
                        "anime.anime_watched": animeStatusRef.anime_watched + 1,
                        "anime.anime_wanted": animeStatusRef.anime_wanted - 1
                    })
                } else if (oldData.status == 'watched' && datas.status == 'wanted') {
                    dashboardRef.update({
                        "anime.anime_watched": animeStatusRef.anime_watched - 1,
                        "anime.anime_wanted": animeStatusRef.anime_wanted + 1
                    })
                }
            }
        })
    },
    deleteMainData(datas, type) {
        dashboardRef.get().then(querySnap => {
            if (type == 'movie') {
                var movieStatusRef = querySnap.data().movie
                dashboardRef.update({
                    "movie.movie_watched": datas.status == 'watched' ? movieStatusRef.movie_watched - 1 : movieStatusRef.movie_watched,
                    "movie.movie_wanted": datas.status == 'wanted' ? movieStatusRef.movie_wanted - 1 : movieStatusRef.movie_wanted
                })
            } else if (type == 'series') {
                var seriesStatusRef = querySnap.data().series
                dashboardRef.update({
                    "series.series_watched": datas.status == 'watched' ? seriesStatusRef.series_watched - 1 : seriesStatusRef.series_watched,
                    "series.series_wanted": datas.status == 'wanted' ? seriesStatusRef.series_wanted - 1 : seriesStatusRef.series_wanted
                })
            }
            else if (type == 'anime') {
                var animeStatusRef = querySnap.data().anime
                dashboardRef.update({
                    "anime.anime_watched": datas.status == 'watched' ? animeStatusRef.anime_watched - 1 : animeStatusRef.anime_watched,
                    "anime.anime_wanted": datas.status == 'wanted' ? animeStatusRef.anime_wanted - 1 : animeStatusRef.anime_wanted
                })
            }
        })
    },

    //Favorite Page
    addFavoriteData(type) {
        dashboardRef.get().then(querySnap => {
            var advancedRef = querySnap.data().advance
                dashboardRef.update({
                    "advance.director": type == 'director' ? advancedRef.director + 1 : advancedRef.director,
                    "advance.actors": type == 'actors' ? advancedRef.actors + 1 : advancedRef.actors,
                    "advance.studio": type == 'studio' ? advancedRef.studio + 1 : advancedRef.studio,
                    "advance.genre": type == 'genre' ? advancedRef.genre + 1 : advancedRef.genre
                })
        })
    },
    deleteFavoriteData(type) {
        dashboardRef.get().then(querySnap => {
            var advancedRef = querySnap.data().advance
            dashboardRef.update({
                "advance.director": type == 'director' ? advancedRef.director - 1 : advancedRef.director,
                "advance.actors": type == 'actors' ? advancedRef.actors - 1 : advancedRef.actors,
                "advance.studio": type == 'studio' ? advancedRef.studio - 1 : advancedRef.studio,
                "advance.genre": type == 'genre' ? advancedRef.genre - 1 : advancedRef.genre
            })
        })
    }
}

export default updateDashboard