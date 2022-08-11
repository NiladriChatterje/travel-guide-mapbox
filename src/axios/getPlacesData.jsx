import axios from 'axios';

export default async function getPlacesData(type, viewState1, viewState2)
{
  try{
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: viewState1.latitude,
        bl_longitude: viewState1.longitude,
        tr_longitude: viewState2.longitude,
        tr_latitude: viewState2.latitude,
        limit:20,
      },
      headers: {
        'x-rapidapi-key': 'b96ff35c83mshdf3bb05226725b0p1ac736jsn85225ef26b74',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  }catch(error)
  {
    console.log(error);
  }
}