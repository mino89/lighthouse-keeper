# LighthouseKeeper

## Getting started
### Install depenencies 

First you need to install project dependencies

`npm install` or `yarn install`

### Configure environments 
you can use angular cli command `ng generante environments` or if you want to create your files manually, just add `environment.ts and environment.development.ts` in `./src/environments` folder

you can find a configuration example
```ts
export const environment = {
  production: true,
  PAGESPEED_API_KEY: 'your_api_key',
  PAGESPEED_API_ROOT: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  API_ROOT: 'http://localhost:3000',
  SECURE_URL_CODE: '660'
};
```
## Development
### Development and Mock server 

Run `npm run dev` to start both development server and mock api server
### Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Base Classes

### EssetialComponent
This class can be used as a base for each class in the application
#### classUtils
A variable that contains shortcuts vor some bundle of classes
```
{
  container: "max-w-6xl	mx-auto p-8",
  fullBlock: "block w-full",
}
```
```ts
  <div [class]="classUtils.container"></div>
```
#### subscription
it creates a new subscription that will be unsuscribed on `OnDestroy`
```ts
@Component({
  ...
})
export class Component implements EssentialComponent implements OnInit{
  obs$: Observable<any>
  ...
  ngOnInit(){
    this.subscription.add(
        obs$.subscribe(...)
    )
  }
}
```
### FetchService
You can use this class for each call to the backend server
#### fetch()
```ts
@Injectable()
export class UserService implements FetchDataService{
 
  constructor(
    http: HttpClient,
    feedback: FeedbackService,
    loading: LoadingService,
  ) {
    super(http,feedback,loading);
  }
  
   public getUsers(): Observable<User[]> {
    return this.fetch<User[]>({
      url: `${this.apiRoot}/sites`,
      method: 'GET',
      params: this.buildParams({
        _embed: 'audits'
      }),
    })
  }
}
```
##### Params
|param|required|type|
|-----|---|----|
|url| required |string|
|method| required |'GET'  'POST'  'PUT' 'DELETE'|
|body| optional |{}|
|headers| optional |HttpHeaders| 
|params| optional |HttpParams | 
#### handleLocalLoading()
this method is used to update `localLoading$` observable that emits a boolean used to implement a loading indicator for each service that implements the class

*In service*
```ts
@Injectable()
export class UserService implements FetchDataService{
 
  constructor(
    ...
  ) {
   ...
  }
  
   public getUsers(): Observable<User[]> {
    const res$ =  this.fetch<User[]>({
      url: `${this.apiRoot}/sites`,
      method: 'GET',
      params: this.buildParams({
        _embed: 'audits'
      }),
    })
    return this.handleLocalLoading(res$);
  }
}
```
*In component*
```ts
@Component({
  selector: 'app-user',
  template: `
    <div class="user-box" *ngIf="loading$|async">
    </div>
  `,

})
export class AppComponent {
  loading$ = this.userService.localLoading$

  constructor(
    private userService: UserService,
  )
}

)
```
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
