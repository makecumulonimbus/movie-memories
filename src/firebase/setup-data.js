import firebaseApp from "./firebase_app.js"

var setupData = {
    getGenreData() {
        const genreRef = firebaseApp.firestore().collection("genre");
        return genreRef.get().then((document) => {
            var genreList = [
                {
                    value: "",
                    text: "",
                }
            ];
            document.forEach((doc) => {
                const dataGenres = doc.data();
                var elementData = {
                    value: dataGenres.name,
                    text: dataGenres.name,
                };
                genreList.push(elementData);
            });
            return genreList
        });
    },
    getStudioData() {
        const studioRef = firebaseApp.firestore().collection("studio");
        return studioRef.get().then((document) => {
            var studioList = [
                {
                    value: "",
                    text: "",
                }
            ];
            document.forEach((doc) => {
                const dataStudios = doc.data();
                var elementData = {
                    value: dataStudios.name,
                    text: dataStudios.name,
                };
                studioList.push(elementData);
            });
            return studioList
        });
    }
}

export default setupData