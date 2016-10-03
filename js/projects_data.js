//template for project.
// {
// "title": "",
// "link": "http://nickstrayer.me/",
// "photo": "images/projectPics/",
// "descriptions": [],
// "github": "https://github.com/nstrayer/"},

var proj_data = [
    {
    "title": "Conditional Survival Curves on Truncated Survival Data",
    "link": "http://bl.ocks.org/nstrayer/4e613a109707f0487da87300097ca502",
    "photo": "images/projectPics/survival_curve.png",
    "descriptions": ["A visual exploration of Kaplin-Meier survival curves on left-truncated survival data.",
                     "Drag the conditional slider to see how the survival curve changes depending on the age of entry.",
                     "All logic for K-M curve written from scratch in javascript and much more perfomant than the <code>survival</code> package in R.",
                     "For more information on the algorithm to generate a K-M curve see <a href = 'https://en.wikipedia.org/wiki/Kaplan%E2%80%93Meier_estimator'> the </a> wikipedia page."],
    "github": "https://gist.github.com/nstrayer/4e613a109707f0487da87300097ca502"
    },
    {
    "title": "Reusable Statistics Plots in D3",
    "link": "http://bl.ocks.org/nstrayer/37a503dd1db369a8f7e3ce21757e19ee",
    "photo": "images/projectPics/reusableCharts.png",
    "descriptions": ["Also see my <a href = 'http://bl.ocks.org/nstrayer/776ca46537c557e59b994aa439fdb26c'>histogram</a> made in the same way.",
                     "My first attempts at making a d3 library.",
                     "Ultimately will be tied with a companion R app for interactive visualization for statisticians.",
                     "Uses the <a href = 'http://ejb.github.io/2016/05/23/a-better-way-to-structure-d3-code.html'> reusable d3 structure </a> proposed by <a href = 'https://twitter.com/elliot_bentley'>Elliot Bentely.</a>"],
    "github": "https://github.com/nstrayer/d3Stats"
    },
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
    "title": "Data Visualization In R",
    "link": "http://nickstrayer.me/visualization_in_r/",
    "photo": "images/projectPics/rVisualization.png",
    "descriptions": [
        "Rmarkdown document for a statistical computing workshop I gave at Vanderbilt.",
        "A brief overview of some common visualization mistakes and code to fix them in ggplot",
        "Provides an overview of some newer visualization tools."
    ],
    "github": "https://github.com/nstrayer/visualization_in_r"
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
    "github": "https://github.com/nstrayer/cs228/tree/master/final"
    },
    {
    "title": "Experimental Leap Motion + D3.js project.",
    "link": "http://www.uvm.edu/~nstrayer/leapD3",
    "photo": "images/projectPics/leap.jpg",
    "descriptions": [
        "Wave your hands around and watch D3.js mirror you!",
        "Requires a leap motion device.",
        "In the future I plan on implementing ways to interact with D3 visualizations by recognizing gestures using machine learning algorithms.",
        "a href='https://www.youtube.com/watch?v=yttEEA-Gd2A'>Video of it in action</a> for if you don't have a Leap.",
        "strong>Note:</strong> When using, start by waving your hands around above the Leap Motion device and watch it calibrate!</li>"
    ],
    "github": "https://github.com/nstrayer/leapD3"
    },
    {
    "title": "Polio's impact on the United States.",
    "link": "http://www.uvm.edu/~nstrayer/histOfPolio",
    "photo": "images/projectPics/polioHist.jpg",
    "descriptions": [
        "A project for <a href='http://bagrow.com/ds2/' target='_blank'> Data Science 2 </a> (Math 295) taught by <a href='http://bagrow.com'>Professor James Bagrow</a> at the University of Vermont.",
        "<a href='http://nbviewer.ipython.org/github/nstrayer/math295/blob/master/HW01/work/hw01.ipynb' target='_blank'> iPython notebook </a>and data files available on my <a href='https://github.com/nstrayer/math295' target='_blank'>github.</a>"
    ],
    "github": "https://github.com/nstrayer/math295"
    },
    {
    "title": "labinthewild.org Interactive Visualization.",
    "link": "http://www.labinthewild.org/studies/visualization/",
    "photo": "images/projectPics/labInTheWild.jpg",
    "descriptions": [
        "A visualization developed for LabInTheWild at the University of Michigan to help participants place themselves among differing demographics.</li>"
    ],
    "github": null
    },
    {
    "title": "Alternative energy filling stations in the U.S..",
    "link": "http://www.uvm.edu/~nstrayer/fillingStations",
    "photo": "images/projectPics/fillingStations.jpg",
    "descriptions": [
        "Using d3.hexbin I took took 18k+ data points and binned them to help explore geographic trends in alternative energy filling stations."
    ],
    "github": "https://github.com/nstrayer/hexbinFillingStations"
    },
    {
    "title": "Marvel Vs. DC in the theater.",
    "link": "http://www.uvm.edu/~nstrayer/superHeroes",
    "photo": "images/projectPics/superHeroes.jpg",
    "descriptions": [
        "I extracted data from The Verge article <a href='http://www.theverge.com/2014/8/22/6056617/marvels-movie-business-is-crushing-dcs-and-its-not-close' target='_blank'> 'Marvel's movie business is crushing DC's and it's not close.'"
    ],
    "github": "https://github.com/nstrayer/superheroes"
    },
    {
    "title": "Where does California get its energy?",
    "link": "http://www.uvm.edu/~nstrayer/powerVis",
    "photo": "images/projectPics/CAPower.jpg",
    "descriptions": [
        "A visualization that explores how electricity is generated in the state of California. Data was cleaned using python and then the visualization was generated using d3.js."
    ],
    "github": "https://github.com/nstrayer/caPowerViz"
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
