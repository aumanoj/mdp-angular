import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
     // link: httpLink.create({ uri: 'https://sistema-jwt.herokuapp.com/graphql'}),
     // link: httpLink.create({ uri: 'http://dev.spark/graphql'}),
      link: httpLink.create({ uri: 'http://13.127.92.88/mdp-api/public/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
