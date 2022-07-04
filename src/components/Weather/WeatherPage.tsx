import React from 'react'
import { WeatherDetails } from './WeatherDetails';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../Hook/reduxHook'
import { fetchCurrentWeather } from '../../state/actions/weather.action';
const WeatherPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentWeather(
      "43543"))

  }, [])
  return (
    <div>
      <WeatherDetails />
    </div>
  )
}

export default WeatherPage