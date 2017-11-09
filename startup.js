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
                artist: "Claude Monet",
                title: "Water Lilies",
                url: "samples/water-lilies-1919-2.jpg"
            },
            {
                artist: "Edvard Munch",
                title: "Scream",
                url: "samples/munch.scream.jpg"
            },
            {
                artist: "Alfons Mucha",
                title: "Winter",
                url: "samples/Alfons_Mucha_-_1896_-_Winter.jpg"
            },
            {
                artist: "Banksy",
                title: "",
                url: "samples/banksy_ratgirlzzz1_1000.jpg"
            },
            {
                artist: "Banksy",
                title: "",
                url: "samples/colorful-banksy.jpg"
            },
            {
                artist: "Elizabeth Malara",
                title: "Blooming Tree",
                url: "samples/A-08-01_Blooming-Tree.jpg"
            },
            {
                artist: "Franklin Carmichael",
                title: "Mirror Lake",
                url: "samples/mirror-lake-1929.jpg"
            },
            {
                artist: "Vincent Van Gogh",
                title: "Wheat Field",
                url: "samples/Vincent_van_Gogh_-_Wheat_Field_with_Cypresses_-_Google_Art_Project.jpg"
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
