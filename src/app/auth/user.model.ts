export class User{
  constructor(
    public email:string|null,
    public id:string|null,
    private _token:string|null,
    private _tokenExpirationDate:string|null
    ){}
    
    get token(){
        if(!this._tokenExpirationDate || new Date() > new Date(this._tokenExpirationDate))
        {
            return null;
        }
        else
        {
            return this._token;
        }
    }
}