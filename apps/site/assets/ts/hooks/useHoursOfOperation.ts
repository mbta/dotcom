import { useEffect, useState } from "react"
import { fetchJsonOrThrow } from "../helpers/fetch-json"
import { useProvider } from "../helpers/use-provider"

const useHoursOfOperation = (routeId: string): any => {

  const [hoursOfOperation, setHoursOfOperation] = useState<any>(null)

  const fetchData = async (
    routeId: string
  ): Promise<any> => await fetchJsonOrThrow(`/schedules/${routeId}/line/hours`);

  useEffect(() => {
    fetchData(routeId).then(result => setHoursOfOperation(result)).catch(console.error)
    // setHoursOfOperation(result)
  }, [routeId])

  return hoursOfOperation;
}

export default useHoursOfOperation