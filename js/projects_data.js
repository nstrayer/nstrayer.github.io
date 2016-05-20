//template for project.
// {
// "title": "",
// "link": "http://nickstrayer.me/",
// "photo": "images/projectPics/",
// "descriptions": [],
// "github": "https://github.com/nstrayer/"},

var proj_data = [
    {
    "title": "What's In Season?",
    "link": "http://nickstrayer.me/growingSeasons",
    "photo": "images/projectPics/growingSeasons.png",
    "descriptions": ["An interactive exploration of what produce is in season.",
                     "Data scraped from <a href = 'http://www.sustainabletable.org/seasonalfoodguide/'>here</a> using python.",
                     "Allows the user to select different in season ingredients and search for recipes containing them.",
                     "Notebooks for scraping in github repo."],
    "github": "https://github.com/nstrayer/growingSeasons"
    },
    {
    "title": "Binomially Distributed Fun!",
    "link": "http://nickstrayer.me/binomialFun/",
    "photo": "images/projectPics/binomial.png",
    "descriptions": ["Demonstrates how a sequence of independent Bernoulli Trials make up the Binomial Distribution.",
                     "Allows the user to toggle the parameters of the Bernoulli and generate a samples.",
                     "Calculates and displays a 95% confidence interval and wilson hypothesis test based upon the generated data.",
                     "All statistics funtions are written from scratch in vanilla javascript."],
    "github": "https://github.com/nstrayer/binomialFun"
    },
    {
    "title": "The Likelihood Function",
    "link": "http://nickstrayer.me/likelihood",
    "photo": "images/projectPics/likelihood.png",
    "descriptions": ["An interactive exploration of the likelihood function.",
                     "Visually explains the concepts of support intervals and likelihood ratios.",
                     "Allows the user to input their own data for creating figures for reports/presentations."],
    "github": "https://github.com/nstrayer/likelihood"
    },
    {
    "title": "Confidence Intervals Explained",
    "link": "http://nickstrayer.me/binomialFun/confidenceIntervals",
    "photo": "images/projectPics/confidenceIntervals.png",
    "descriptions": [
        "Allows the user to explore what a frequentist confidence interval truly is.",
        "To many people, including the scientists who use them, the behavior of Confidence Intervals is confusing.",
        "All statistics functions are written from base javascript. See github repo for code."
    ],
    "github": "https://github.com/nstrayer/binomialFun"
    },
    {
    "title": "Probability Integral Transformations",
    "link": "http://nickstrayer.me/distributionTransforms/",
    "photo": "images/projectPics/integralTransform.png",
    "descriptions": [
        "Made in an effort to visualize what happens when you transform a probability distribution with a function.",
        "Uses the normal distribution transformed by the normal cdf, resulting in a uniform distribution. See <a href = 'https://en.wikipedia.org/wiki/Probability_integral_transform'> here</a> for more info. ",
        "Inspired by my course work in Probability at Vanderbilt."
    ],
    "github": "https://github.com/nstrayer/distributionTransforms"
    },
    {
    "title": "Where Are Wildfires Burning?",
    "link": "http://nickstrayer.me/wildfires/",
    "photo": "images/projectPics/wildfires.png",
    "descriptions": [
        "Uses open data from NASA satelites on global temperature anomalies.",
        "Fresh data is downloaded every day and pushed to the static page via shell scripts avoiding the need for servers.",
        "<a href = 'https://firms.modaps.eosdis.nasa.gov/active_fire/text/USA_contiguous_and_Hawaii_48h.csv'>Data source.</a>"
    ],
    "github": "https://github.com/nstrayer/wildfires"
    },
    {
    "title": "Interactive Manhattan Plot R Package.",
    "link": "http://nickstrayer.me/D3ManhattanPlots/",
    "photo": "images/projectPics/d3Manhattan.png",
    "descriptions": [
        "An R package to generate interactive and embedable manhattan plots for genome wide association studies.",
        "Binds R and Javascript + D3 using the <a href = 'http://www.htmlwidgets.org/''>HTMLWidgets</a> package.",
    ],
    "github": "https://github.com/nstrayer/D3ManhattanPlots"
    },
    {
    "title": "State Farmers Market Profiles.",
    "link": "http://nickstrayer.me/marketStory/",
    "photo": "images/marketStory.png",
    "descriptions": [
        "Companion visualization to <a href='http://nickstrayer.me/farmersMarkets/' target='_blank'> What Do Farmer's Markets Sell?</a>",
        "Explore different states path's through different metrics relating to farmers markets.",
        "Uses equal sized states map as menu to reduce bias associated with normal projections.",
        "Data courtesy of <a href='http://catalog.data.gov/dataset/farmers-markets-geographic-data' target='_blank'> Data.gov</a>."
    ],
    "github": "https://github.com/nstrayer/marketStory"
    },
    {
    "title": "What Do Farmer's Markets Sell?",
    "link": "http://nickstrayer.me/farmersMarkets/",
    "photo": "images/farmersMarkets.png",
    "descriptions": [
        "Select different good types (e.g. Vegetables, Fruit) and see which markets sell them.",
        "Assemble different combinations of goods to explore regional trends.",
        "Dynamic layout adjusts to mobile or desktop views.",
        "Be patient with it, more than eight thousand points are being drawn to the screen. It will bog down older phones/computers.",
        "Data courtesy of <a href='http://catalog.data.gov/dataset/farmers-markets-geographic-data' target='_blank'> Data.gov"
    ],
    "github": "https://github.com/nstrayer/farmersMarkets"
    },
    {
    "title": "Interactive Manhattan Plot Viewer.",
    "link": "http://www.uvm.edu/~nstrayer/manhattanPlots",
    "photo": "images/projectPics/manhattanPlots.png",
    "descriptions": [
        "Developed as an experiment in exploratory data visualization.",
        "Select different controls for comparison, e.g. non-dominant arm growth to see linked snps.",
        "A manhattan plot is a commonly used tool in accessing genetic roots for traits",
        "Uses data from the FAMuSS study (<a href='http://isites.harvard.edu/fs/docs/icb.topic1388631.files/thompson_FAMuSS.pdf' target='_blank'> Thompson Et Al. 2004</a>)."
    ],
    "github": "https://github.com/nstrayer/manhattanPlots"
    },
    {
    "title": "Learn ASL numbers with Leap Motion.",
    "link": "http://www.uvm.edu/~nstrayer/signLanguage",
    "photo": "images/projectPics/signLanguage.jpg",
    "descriptions": [
        "First place project at 2014 UVM CS Fair.",
        "Teaches numbers 0-9 in American Sign Language.",
        "Utilizes three.js and webGL for rendering.",
        "Built to exploit multiple HCI and Cognitive Psychology theories (e.g. object consistancy and the generation effect) in order to maximize learning experience."
    ],
    "github": "https://github.com/nstrayer/leapD3"
    }
]


// {
// "title": "",
// "link": "",
// "photo": "",
// "descriptions": [
//
// ],
// "github": "https://github.com/nstrayer/"
// },
