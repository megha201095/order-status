// Function to calculate the order cost and inventory status 
function orderStatus(country, passNO, mVal, gVal) {
  let mask_uk = 100
  let mask_ger = 100
  let gloves_uk = 100
  let gloves_ger = 50
  let mask_uk_price = 65
  let mask_ger_price = 100
  let gloves_uk_price = 100
  let gloves_ger_price = 150
  const totalGloves = 150
  const totalMask = 200
  let cost = 0
  if( country === "UK") {
    if(gVal<= gloves_uk && mVal <= mask_uk){
      cost = (gVal * gloves_uk_price) + (mVal * mask_uk_price) 
      mask_uk = mask_uk - mVal;
      gloves_uk = gloves_uk - gVal;   
      return `${cost}:${mask_uk}:${mask_ger}:${gloves_uk}:${gloves_ger}`

    }

    else if(gVal <= totalGloves && mVal <= totalMask){
      return calculateImportCost(gVal, mVal, 'UK', passNO)
    }
  else return `OUT_OF_STOCK:${mask_uk}:${mask_ger}:${gloves_uk}:${gloves_ger}`

 }
 else if( country === "Germany") {
  if(gVal<= gloves_ger && mVal <= mask_ger){
    cost = (gVal * gloves_ger_price) + (mVal * mask_ger_price) 
    mask_ger = mask_ger - mVal;
    gloves_ger = gloves_ger - gVal;  
    return `${cost}:${mask_uk}:${mask_ger}:${gloves_uk}:${gloves_ger}`

  }
  
  else if(gVal <= totalGloves && mVal <= totalMask){
    return calculateImportCost(gVal, mVal, 'Germany', passNO)
  }
  else return `OUT_OF_STOCK:${mask_uk}:${mask_ger}:${gloves_uk}:${gloves_ger}`

}
  //Function to calculate the import cost and discount on shipping
  function calculateImportCost (gVal, mVal, country, passNO) {
  let importMask = country === 'UK' ? ( mVal> mask_uk ? mVal - mask_uk : 0 ) : ( mVal> mask_ger ? mVal - mask_ger : 0 )
  let importGloves = country === 'UK' ? (gVal> gloves_uk ? gVal - gloves_uk : 0) : (gVal> gloves_ger ? gVal - gloves_ger : 0)
  let nonImportMask = mVal - importMask
  let nonImportGloves = gVal - importGloves
  mask_uk = country === 'UK' ? mask_uk - nonImportMask : mask_uk - importMask
  mask_ger = country === 'UK' ? mask_ger - importMask : mask_ger - nonImportMask
  gloves_uk = country === 'UK' ? gloves_uk - nonImportGloves : gloves_uk - importGloves
  gloves_ger = country === 'UK' ? gloves_ger - importGloves : gloves_ger - nonImportGloves

  let glovesCost = country === 'UK' ? (gloves_uk_price * nonImportGloves) + (gloves_ger_price * importGloves) :  (gloves_ger_price * nonImportGloves) + (gloves_uk_price * importGloves)
  let maskCost =  country === 'UK' ? (mask_uk_price * nonImportMask) + (mask_ger_price * importMask) : (mask_ger_price * nonImportMask) + (mask_uk_price * importMask)

  cost = glovesCost + maskCost
  if( importGloves >= 10 || importMask >= 10) {
    let chargesOnMask = Math.ceil(importMask/10) * 400
    let chargesOnGloves = Math.ceil(importGloves/10) * 400
     cost = cost + chargesOnGloves + chargesOnMask
     country === 'UK' ? (passNO[0] === 'B'? cost = cost -(cost*0.2) : cost) : (passNO[0] === 'A'? cost = cost -(cost*0.2) : cost)
  }
  return `${cost}:${mask_uk}:${mask_ger}:${gloves_uk}:${gloves_ger}`
   }
  }

//  UK:B123AB1234567:Gloves:20:Mask:10
console.log(orderStatus('UK','B123AB1234567',10, 20));
