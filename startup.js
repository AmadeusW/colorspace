var sampleImages = new Vue({
    el: "#sampleImages",
    data: {
        sampleImages: [
            {
                title: "Starry Night",
                url: "samples/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
                artist: "Vincent Van Gogh"
            },
            {
                title: "Still Life on Canvas",
                url: "samples/A-24-elizabethmalarawieczorek15.jpg",
                artist: "Elizabeth Malara"
            },
            {
                title: "Blooming Tree",
                url: "samples/A-08-01_Blooming-Tree.jpg",
                artist: "Elizabeth Malara"
            }
        ]
    },
    filters: {
        hash: function(value) {
            return "#"+value;
        }
    }
})
