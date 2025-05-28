import { v4 as uuidv4 } from 'uuid';


export function formatDate(date: Date): string {
  const formatter = Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  ,

  })
    // const day = date.getDate().toString().padStart(2, '0')
    // const month = date.toLocaleString('en-US', { month: 'short' })
    // const year = date.getFullYear().toString().slice(-2)

    // const formattedDate = `${day}, ${month} '${year}`
    return formatter.format(new Date(date))
}


// method and interface to convert BigInt to String 
// fixes "TypeError: Do not know how to serialize a BigInt" error
declare global {
    interface BigInt {
      toJSON(): string;
    }
  }
  
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };


export function generateRandomId(): string {
    return uuidv4()
  }