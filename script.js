function calculateMinCost() {
  const roper= document.getElementById("rope-lengths")
	let lenarr= (roper.value).split(',')
	let sum=0;
	let fs= lenarr.map(x => Number(x))
	let gh=0
	while(fs.length!=1){
		fs.sort(function(a,b){return a-b})
		sum=fs[0]+fs[1]
		fs[1]=sum
		fs.shift()
		gh=gh+sum
	}
	const reser= document.getElementById("result")
	reser.innerText= gh
}  