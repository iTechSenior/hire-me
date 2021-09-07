# Famly-React-testing

## Public URL

https://famly-client.surge.sh/

## Installation Instructions

1. clone the repo
2. yarn install
3. yarn start

## Design

I used pagination and lazy loading to list Children. When we change the page in pagination, we usually call an api with parmas of pageSize and currentPage everytime. As getChildren api which is provided has no limit or offset, I tried to mock it by creating a function which pageNumber and currentPage params are passed into and call it every time we change the page assuming getChildren api like a real pagination api.

WHile fetching the data, placeholders like skeleton components are shown. And as I used lazy loading, it renders list items only what we need, and placeholders are shown till those are entering into viewport.

So I created base components like Button, Avatar, ChildListItem, Placeholder, ... and ChildrenList component.

We can checkin/checkout in ChildListItem component. In that component, I just showed the avatar, full name, and checkedin/checkedout status for each child. Users are only allowed to checkin after entering the pick up time. For checkedin children, time picker is not shown and we can simply checkout.
