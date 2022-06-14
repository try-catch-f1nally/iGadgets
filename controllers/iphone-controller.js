const getProduct = (modelParam, memoryParam, colorParam) => {
    return {
        images: [
            "iphone-13-midnight.jpg",
            "iphone-13-midnight-1.jpg",
            "iphone-13-midnight-2.jpg",
            "iphone-13-midnight-3.jpg",
            "iphone-13-midnight-4.jpg",
        ],
        name: "Apple iPhone 13 128GB (Midnight)",
        price: 875,
        model: "13",
        memory: 128,
        memories: [128, 256, 512],
        color: "midnight",
        colors: ["blue", "red", "green", "pink", "midnight", "starlight"],
        isAvailable: true,
        rating: 5,
        description: {
            header: "Apple iPhone 13 is an amazing new product in 2021",
            paragraph: "It seems that we can be better for the flagship twelve, as it is equipped with advanced technologies in the field of mobile distribution. But all the same, the creators of Cupertino dermal once in a while can be amazed by the novelties with a particularly stylish design and innovative filling. A hot Apple iPhone 13 will freeze at first glance. Elegant design of the body, new colors, marvelous display, cameras that can be used with better photo equipment, smarter processors and a smarter operating system. For a long time already, it’s not just smartphones, but the performance of high-tech art.",
            listHeader: "Key Features of iPhone 13",
            listItems: [
                "Changed frames. New placement of the block of the main cameras.",
                "Increased battery autonomy.",
                "New generation of A15 Bionic processor.",
                "5 new colors for the hull.",
                "Unique stabilization system.",
                "Portrait shooting mode.",
                "The memory limit is 128GB."
            ]
        },
        videoLink: "XKfgdkcIUxw",
        characteristics: {
            version: "Global",
            size: "• Width: 71.5 mm<br>• Length: 146.7 mm<br>• Thickness: 7.65 mm",
            cpu: "Apple A15 Bionic processor<br>" +
                "• New 6 ‑ core processor with 2 performance cores and 4 performance cores <br>" +
                "• New 4 ‑ core graphics processor <br>" +
                "• New 16 ‑ core Neural Engine system",
            camera: "• Dual camera system 12MP: Wide-angle and Extra-wide <br>" +
                "• Wide-angle: ƒ / 1.6 aperture <br>" +
                "• Extra-wide: ƒ / 2.4 aperture and 120° zoom <br>" +
                "• Optical zoom 2 × zoom • Digital zoom up to 5× <br>" +
                "• Portrait mode with full effect bokeh and “Depth” function <br>" +
                "• Portrait lighting (six options: Natural light, Studio light, Contour light, Stage light - b/w<br>" +
                "• Optical stabilization cameralization function 'active; 5-lens lens <br>" +
                "• True Tone spall with Slow Sync function <br>" +
                "• Panoramic zoom (up to 63 MP) <br>" +
                "• Sapphire-clear lens protection <br>" +
                "• Focus Pixels enhancement on the entire matrix (wide-angle camera) <br>" +
                "• Night mode <br>" +
                "• Deep technology Fusion <br>" +
                "• Smart HDR 4 <br>" +
                "• Photographic Styles <br>" +
                "• Wide Color Range for Photos and Live Photos <br>" +
                "• Lens Defocus Correction (Over Wide Angle Camera) <br>" +
                "• Advanced Red-Eyes System <br>" +
                "• Automatic Image Stabilization <br>" +
                "• Burst Capture <br>" +
                "• Snap Photos to Capture Location Image format: HEIF and JPEG",
            screen: "• Super Retina XDR display <br>" +
                "• OLED display, full front panel, 6.1 inch diagonal <br>" +
                "• 2,532 × 1,170 pixels, 460 pixels per inch <br>" +
                "• HDR support <br>" +
                "• True Tone technology <br>" +
                "• Wide color gamut (P3) <br>" +
                "• Tactile touch response <br>" +
                "• Contrast 2,000,000: 1 (standard) <br>" +
                "• Brightness up to 800 cd / m² (standard); up to 1200 cd / m² when viewing content in HDR format<br>" +
                "• Oleophobic coating, resistant to fingerprints <br>" +
                "• Support for simultaneous display of multiple languages and character sets",
            protection: "IP68 rating according to IEC 60529 (immersion in water up to 6 meters for up to 30 minutes is allowed)"
        },
        comments: [
            {
                authorName: "Alex",
                date: "05/13/22",
                userId: "",
                rating: 4,
                text: "Some of the best phones I've seen. The screen is just a bomb, 120 Hz is just to steer! As for the store itself, the delivery is quite fast (it took 2 days), the prices seem to be ok, on a par with others. The guarantee is interesting, especially breaking the screen is not cheap, but changing the screen will be more expensive."
            },
            {
                authorName: "Martha",
                date: "05/10/22",
                userId: "",
                rating: 4,
                text: "At first it was unusual to switch from android, but now I'm very happy that I bought this phone)"
            },
            {
                authorName: "Helena",
                date: "05/03/22",
                userId: "",
                rating: 5,
                text: "Cool cameras, I take incredible photos on it! thank you)"
            },
            {
                authorName: "Marina",
                date: "17/01/22",
                userId: "",
                rating: 5,
                text: "The camera is great, easy to use and a fast smartphone"
            },
        ]
    }
};

const renderIPhonePage = (req, res) => {
    const {model: modelParam, memory: memoryParam, color: colorParam} = req.params;
    const {
        images,
        name,
        price,
        model,
        memory,
        memories,
        color,
        colors,
        isAvailable,
        rating,
        description,
        videoLink,
        characteristics,
        comments
    } = getProduct(modelParam, memoryParam, colorParam);

    res.render("iphone", {
        title: name,
        firstName: req.session.firstName,
        productsInCart: [],
        images,
        name,
        price,
        model,
        memory,
        memories,
        color,
        colors,
        isAvailable,
        rating,
        description,
        videoLink,
        characteristics,
        comments
    });
};

module.exports = {renderIPhonePage};