  
import React from 'react';
import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {fetchShow as mockFetchShow} from '../api/fetchShow';
import App from '../App';
import {episodeData} from "../api/testEpisodes"

jest.mock('../api/fetchShow');
//so this data should be the one that is returned by the mockFetchShow function - so it should be same format
//as returned by fetchShow res. App will then save the res.data to the state


test ("successfully render data from api",()=>{
// intercept the api call using mockFetchShow
mockFetchShow.mockResolvedValueOnce(episodeData)
render (<App />)
//when the api call is initialted, it shows h2 'Fetching data...'(note - useEffect during initial load initials api fetch)

const fetch=screen.getByText(/Fetching data.../i)
expect(fetch).toBeInTheDocument();

})

test ("check await for api call and receive mock value",async ()=>{

mockFetchShow.mockResolvedValueOnce(episodeData)

render(<App />)
const dropdownButton= await screen.findByText(/select a season/i)
expect(dropdownButton).toBeInTheDocument()
await userEvent.click(dropdownButton)
const dropDownOptions = await screen.findAllByText(/\bseason \b[1-4]/i)
expect( dropDownOptions).toHaveLength(1)



})