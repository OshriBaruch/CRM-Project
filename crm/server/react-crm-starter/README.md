# react-crm-starter

## Data
To load the data into a file, you can use this code:
<!-- HTML generated using hilite.me --><div style="overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #888888">//use setTimeout to simulate an API call - you can, of course, do this without the setTimeout, but using setTimeout will simplify your transition to connecting your to your server later on</span>
setTimeout(() =&gt; {
    <span style="color: #008800; font-weight: bold">  let</span> data = require(&#39;../data.json&#39;)
    <span style="color: #888888">  //populate state with data</span>
}, <span style="color: #0000DD; font-weight: bold">100</span>)
</pre></div>

Where do you load data in React?

<hr>

## CSS
- Use google-fonts API to get the `Montserrat` font
- Use `#ecf0f1` for your app's background-color
- Use `#0a1612` for the nav-bar's background color
- Use `#F7CE3E` for the table's header background-color 
- Use these for your badges background colors: `#2ecc71`, `#3498db`, `#e74c3c`, `#f1c40f`
- And these colors for your charts:
    - Top Salespeople: `#003f5c`
    - Sales By X: `#955196`
    - Sales over time: `#ff6e54`
    - Client Distribution: `#795548`, `#34495e`, `#95a5a6` 
- Check <a href="http://tobiasahlin.com/spinkit/" target="_blank">this</a> out for simple to implement loaders
