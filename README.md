# Oracle Rest Data Services - NodeJS API

This package allows a user to call a Oracle REST Data Service using standards based REST processes. It exposes processes
to allow for calling:

- GET
- PUT
- POST
- DELETE

## GET

There are a few types of messages you can create using this package.

- You can call a method to get all entities
- You can call a method to get one entity
- You can call methods to filter using the query string

> All of these methods other than the GET one allow for paging. See the documentation on **offset** and **limit** to
> understand more about how to page results.

### Paging

Each GET method allows for request parameters. The request parameters look like the following:

````
interface IOrdsPagingParams {
    offset: number
    limit: number
}
````

lklkjlk

Setting the offset, tells the ORDS server to skip that number of records.
Setting the limit tells the ORDS server how many records to take

### Responses

