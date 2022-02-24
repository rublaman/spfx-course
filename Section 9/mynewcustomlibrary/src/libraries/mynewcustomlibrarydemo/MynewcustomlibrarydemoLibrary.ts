export class MynewcustomlibrarydemoLibrary {
  public name(): string {
    return 'MynewcustomlibrarydemoLibrary';
  }

  public getCurrentTime(): string {
    let currentDate: Date = new Date();
    let str: string;

    str = "<br>Today date is : ", currentDate.toDateString();
    str += "<br>Current time is :", currentDate.toTimeString();

    return str;
  }
}