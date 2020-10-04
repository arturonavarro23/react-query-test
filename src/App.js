import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryCacheProvider, makeQueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Flex } from '@chakra-ui/core';

import Header from './components/header';
import Home from './pages/home';
import Details from './pages/details';
import RestaurantCounter from './components/restaurantCounter';
import SearchByName from './components/searchByName';

const queryCache = makeQueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <Header />
          <Flex direction={{ xs: 'column-reverse', lg: 'row' }}>
            <Flex flex={1} p={5} pr={0} direction="column" align="flex-start">
              <RestaurantCounter />
              <SearchByName />
            </Flex>
            <Flex flex={3} p={5} direction="column">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/restaurants/:id" component={Details} />
              </Switch>
            </Flex>
          </Flex>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryCacheProvider>
    </ThemeProvider>
  );
}

export default App;
