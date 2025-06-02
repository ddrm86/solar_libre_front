import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import {
  CYearlyConsumption, type IConsumptionByTimeBand,
  type IYearlyConsumption
} from '@/models/consumption/inputConsumption.ts'
import { CYearlySunHours, type IYearlySunHours } from '@/models/consumption/sunHours.ts'
import { consumptionDistributionProfile } from '@/models/consumption/consumptionDistributionProfile'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { chartPlaceholderPicture } from '@/models/report/chartPlaceholderPicture.ts'
import axios from 'axios'

export const useInputConsumptionStore = defineStore('input_consumption', () => {
  const projectInfoStore = useProjectInfoStore()

  const consumption = ref<IYearlyConsumption>(new CYearlyConsumption())

  const consumptionByTimeBand = computed(() => {
    return consumption.value.calcTotalConsumptionByTimeBand()
  })

  const totalConsumptionPerMonth = computed(() => {
    return consumption.value.calcTotalConsumptionPerMonth()
  })

  const totalConsumption = computed(() => {
    return consumption.value.calcTotalConsumption()
  })

  const yearlySunHours = ref<IYearlySunHours>(new CYearlySunHours())

  const yearlyPVHours = computed(() => {
    return {
      pvHoursPerMonth: yearlySunHours.value.sunHoursPerMonth.map(({ sunrise, sunset }) => ({
        sunrise: new Date(sunrise.getTime() + 2 * 60 * 60 * 1000), // Add 2 hours
        sunset: new Date(sunset.getTime() - 2 * 60 * 60 * 1000), // Subtract 2 horas
      })),
    }
  })

  const pvConsumptionsPerMonth = computed(() => {
    return yearlyPVHours.value.pvHoursPerMonth.map((pvHours, monthIndex) => {
      const { sunrise, sunset } = pvHours
      const startHour = sunrise.getHours()
      const endHour = sunset.getHours()

      const monthlyConsumption = consumption.value.consumptionsPerMonth[monthIndex]
      const profile = consumptionDistributionProfile[monthIndex]

      const pvConsumption = { peak: 0, flat: 0, valley: 0 }

      for (let hour = startHour; hour <= endHour; hour++) {
        pvConsumption.peak += (monthlyConsumption.peak * profile[hour].percentPeak) / 100
        pvConsumption.flat += (monthlyConsumption.flat * profile[hour].percentFlat) / 100
        pvConsumption.valley += (monthlyConsumption.valley * profile[hour].percentValley) / 100
      }

      return pvConsumption
    })
  })

  const totalPvConsumptionPerMonth = computed(() => {
    return pvConsumptionsPerMonth.value.map((pvConsumption) => {
      return pvConsumption.peak + pvConsumption.flat + pvConsumption.valley
    })
  })

  const totalPvConsumption = computed(() => {
    return totalPvConsumptionPerMonth.value.reduce((sum, monthlyTotal) => sum + monthlyTotal, 0)
  })

  const consumptionChartImage = ref(chartPlaceholderPicture)

  const createConsumptionPayload = (consumption: IYearlyConsumption) => {
    return consumption.consumptionsPerMonth.map((monthlyConsumption, index) => ({
      month: index,
      peak: monthlyConsumption.peak,
      flat: monthlyConsumption.flat,
      valley: monthlyConsumption.valley,
      project_id: projectInfoStore.projectInfo.id,
    }))
  }

  const saveConsumptionInfo = async () => {
    const payload = createConsumptionPayload(consumption.value)

    return axios
      .post(`/energy_consumption/?project_id=${projectInfoStore.projectInfo.id}`, payload)
      .then(() => {
      })
  }

  const loadConsumptionInfo = async () => {
    interface IApiConsumption {
      month: number;
      peak: number;
      flat: number;
      valley: number;
      project_id: string;
    }

    return axios
      .get(`/energy_consumption/project/${projectInfoStore.projectInfo.id}`)
      .then((response) => {
        const energyConsumptions = response.data;
        consumption.value.consumptionsPerMonth = [
          ...Array.from({ length: 12 }, (_, index) => {
            const entry = energyConsumptions.find((e: IApiConsumption) => e.month === index);
            return entry
              ? { peak: entry.peak, flat: entry.flat, valley: entry.valley }
              : { peak: 0, flat: 0, valley: 0 };
          }),
        ] as [IConsumptionByTimeBand];
      })
  };

  watch(
    () => [
      projectInfoStore.projectInfo.location.latitude,
      projectInfoStore.projectInfo.location.longitude,
    ],
    ([lat, lng]) => {
      void yearlySunHours.value.fetchYearlySunHours(lat, lng)
    },
    { immediate: true },
  )

  return {
    consumption,
    consumptionByTimeBand,
    totalConsumptionPerMonth,
    totalConsumption,
    yearlySunHours,
    yearlyPVHours,
    pvConsumptionsPerMonth,
    totalPvConsumptionPerMonth,
    totalPvConsumption,
    consumptionChartImage,
    saveConsumptionInfo,
    loadConsumptionInfo,
  }
})
