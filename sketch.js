function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

}

$('.container').append("<div class='ct-got"+[i]+"'></div>")
var got = new Chartist.Bar('.ct-got'+[i], {
labels: [labelsName],
series: [
  { name: "danger", data: [data[i].rujukanBawah] },
  { name: "normal", data: [data[i].rujukanAtas] },
  // { name: "danger", data: data[i].rujukanBawah+data[i].rujukanAtas }
],
target: data[i].result
}, {
  stackBars: true,
  horizontalBars: true,
  axisX: {
	showGrid: false,
	offset: 100,
	// type: Chartist.FixedScaleAxis,
	// ticks: [0, 11, 15, 30],
	// stretch: true,
	// labelInterpolationFnc: function (value) {
	//   return value.toFixed(1);
	// }
  },
  axisY: {
	offset: 100,
  },
  plugins: [
	// Chartist.plugins.tooltip({
	//   appendToBody: true,
	//   pointClass: 'my-cool-point',
	// }),
	// Chartist.plugins.ctBarLabels()
  ],
}).on('created', function () {
  seriesIndex = -1;
}).on('draw', function (data) {
  if (data.type === 'bar') {
	data.element.attr({
	  style: 'stroke-width: 30px'
	})
	data.element._node.onclick = () => {
	  alert(data.value.x)
	}
	if (data.index === 0) {
	  seriesIndex++;
	}
	var seriesName = got.data.series[seriesIndex].name;
	data.element.root().elem('text', {
	  x: data.x1,
	  y: data.y2 + 5
	}, 'ct-bar-label').text(seriesName)
  }

  if (data.type === 'label' && data.text === labelsName) {
	console.log('ini data text',data.text)
	
	let url = searchUrl + data.text.replace(' ','_')
	console.log(url)
	loadJSON(url, gotContent, 'jsonp')

	function gotContent(data) {
	  $(function () {
		var link = String(data[3][0])
		$('.ct-start').popover({
		  container: 'body',
		  placement: 'bottom',
		  title: String(data[2][0]),
		  html: true,
		  content: "<a target='_blank' href='" + link + "'>Wikipedia</a>",
		  trigger: 'hover',
		  delay: { "hide": 5000 }
		})
	  })
	}

	for (let j = 0; j < got.data.series[0].data[0].meta; j++) {
	  // console.log(i)
	  if (j === got.data.target) {
		$(function () {
		  $('.ct-bar').popover({
			container: 'body',
			placement: 'top',
			content: i,
			trigger: 'hover focus',
		  })
		})
	  } else {
		console.log('bukan target')
	  }
	}
	// console.log(chart)
  }
})


// $('.container').append("<div class='ct-got" + [i] + "'></div>")
// var got = new Chartist.Bar('.ct-got' + [i], {
//   labels: [labelsName],
//   series: [
// 	{ name: "danger", data: [data[i].rujukanBawah] },
// 	{ name: "normal", data: [data[i].rujukanAtas] },
// 	{ name: "danger", data: [data[i].result] }
//   ],
//   target: data[i].result
// }, {
// 	stackBars: true,
// 	horizontalBars: true,
// 	axisX: {
// 	  showGrid: false,
// 	  offset: 100,
// 	  type: Chartist.FixedScaleAxis,
// 	  ticks: [0, data[i].rujukanBawah, data[i].rujukanAtas, data[i].rujukanBawah + data[i].result],
// 	  stretch: true,
// 	  labelInterpolationFnc: function (value) {
// 		return value.toFixed(1);
// 	  }
// 	},
// 	axisY: {
// 	  offset: 100,
// 	},
// 	plugins: [
// 	  // Chartist.plugins.tooltip({
// 	  //   appendToBody: true,
// 	  //   pointClass: 'my-cool-point',
// 	  // }),
// 	  // Chartist.plugins.ctBarLabels()
// 	],
//   }).on('created', function () {
// 	seriesIndex = -1;
//   }).on('draw', function (data) {
// 	if (data.type === 'bar') {
// 	  data.element.attr({
// 		style: 'stroke-width: 30px'
// 	  })
// 	  data.element._node.onclick = () => {
// 		alert(data.value.x)
// 	  }
// 	  if (data.index === 0) {
// 		seriesIndex++;
// 	  }
// 	  var seriesName = got.data.series[seriesIndex].name;
// 	  data.element.root().elem('text', {
// 		x: data.x1,
// 		y: data.y2 + 5
// 	  }, 'ct-bar-label').text(seriesName)
// 	}

// 	if (data.type === 'label' && data.text === labelsName) {
// 	  console.log('ini data text', data.text)

// 	  let url = searchUrl + data.text.replace(' ', '_')
// 	  console.log(url)
// 	  loadJSON(url, gotContent, 'jsonp')

// 	  function gotContent(data) {
// 		$(function () {
// 		  var link = String(data[3][0])
// 		  $('.ct-start').popover({
// 			container: 'body',
// 			placement: 'bottom',
// 			title: String(data[2][0]),
// 			html: true,
// 			content: "<a target='_blank' href='" + link + "'>Wikipedia</a>",
// 			trigger: 'hover',
// 			delay: { "hide": 5000 }
// 		  })
// 		})
// 	  }

// 	  for (let j = 0; j < got.data.series[0].data[0].meta; j++) {
// 		// console.log(i)
// 		if (j === got.data.target) {
// 		  $(function () {
// 			$('.ct-bar').popover({
// 			  container: 'body',
// 			  placement: 'top',
// 			  content: i,
// 			  trigger: 'hover focus',
// 			})
// 		  })
// 		} else {
// 		  console.log('bukan target')
// 		}
// 	  }
// 	  // console.log(chart)
// 	}
//   })