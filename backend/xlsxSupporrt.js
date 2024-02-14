import XLSX from 'xlsx';
import { uploadProductDetails } from './ProductUpload.js';
const transformdata = (data)=>{
  data.map((row)=>{
    var colors = row["colors"];
    colors = colors.split(",")
    row["colors"]=colors;
    var category_name = row["category_name"];
    category_name = category_name.split(",")
    row["category_name"]=category_name;
    // console.log(row);
  })
  console.log("transformer data: ",data);
  return data;
}
export async function readExcelFileAndUpload(file, startRow = 2) {
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const dataStartingFromRow = rawData.slice(startRow);
  
    return uploadAllData(transformdata(dataStartingFromRow));
  }

  
const uploadAllData = async (updateddata) =>{
  updateddata.map(async (row)=>{
    const r = await uploadProductDetails(row)
  })
}
