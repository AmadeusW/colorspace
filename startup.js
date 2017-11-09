var sampleImages = new Vue({
    el: "#sampleImages",
    data: {
        sampleImages: [
            {
                artist: "Vincent Van Gogh",
                title: "Starry Night",
                url: "samples/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
            },
            {
                artist: "Elizabeth Malara",
                title: "Still Life on Canvas",
                url: "samples/A-24-elizabethmalarawieczorek15.jpg"
            },
            {
                artist: "Elizabeth Malara",
                title: "Blooming Tree",
                url: "samples/A-08-01_Blooming-Tree.jpg"
            }
        ]
    },
    filters: {
        hash: function(value) {
            return "#"+value;
        }
    },
    methods: {
        loadImage: function (src) {
            loadImage(src);
        }
    }
})
