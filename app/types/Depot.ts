
export default interface Depot{
  name : string,
  description : string,
  html_url : string,
  private : boolean,
  owner : {
    login : string
  }
}