var renderSettings = new Vue({
    el: "#renderSettings",
    methods: {
        increaseQuality: function() {
            this.downscaling = increaseQualityAndUpdate()
        },
        decreaseQuality: function() {
            this.downscaling = decreaseQualityAndUpdate()
        },
        toggleRadius: () => toggleRadius(),
        toggleDensity: () => toggleDensity(),
        toggleScarcity: () => toggleScarcity(),
        toggleDimming: function() {
            this.dimming = !this.dimming;
            document.getElementById("background").style.opacity = this.dimming ? 0.3 : 1.0;
        }
    },
    filters: {
        stars: function(value) {
            return "★".repeat(5-value) + "☆".repeat(value);
        },
        dimmingText: function(value) {
            return value ? "Dim background" : "Regular picture"
        }
    },
    data: {
        downscaling: 3,
        dimming: true
    }
})

var sampleImages = new Vue({
    el: "#sampleImages",
    methods: {
        loadImage: function (src) {
            loadImage(src);
        }
    },
    filters: {
        hash: function(value) {
            return "#"+value;
        }
    },
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
    }
})
