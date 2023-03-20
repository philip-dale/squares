import { setActivePinia, createPinia } from 'pinia'
import { samplesStore } from '@/stores/samplesStore'

const testSampleLoad = '{"allSamples":{"1":{"0":{"parts":[[2,0,2],[2,2,2]],"parentId":"1","uid":"0","lives":3,"selected":false,"containerIndex":0},"1":{"parts":[[0,0,2],[2,2,2]],"parentId":"1","uid":"1","lives":3,"selected":false,"containerIndex":1},"2":{"parts":[[2,2,2],[2,1,2]],"parentId":"1","uid":"2","lives":3,"selected":false,"containerIndex":2},"3":{"parts":[[2,0,0],[0,0,0]],"parentId":"1","uid":"3","lives":3,"selected":false,"containerIndex":3},"4":{"parts":[[2,2,0],[2,0,2]],"parentId":"1","uid":"4","lives":3,"selected":false,"containerIndex":4}},"5":{},"2_1":{"7":{"parts":[[2,2,2],[1,1,2]],"parentId":"2_1","uid":"7","lives":2,"selected":false,"containerIndex":0},"8":{"parts":[[2,2,1],[2,1,2]],"parentId":"2_1","uid":"8","lives":2,"selected":false,"containerIndex":1},"9":{"parts":[[2,0,2],[2,2,0]],"parentId":"2_1","uid":"9","lives":2,"selected":false,"containerIndex":2},"10":{"parts":[[1,1,2],[1,1,2]],"parentId":"2_1","uid":"10","lives":2,"selected":false,"containerIndex":3},"11":{"parts":[[0,0,0],[0,1,0]],"parentId":"2_1","uid":"11","lives":2,"selected":false,"containerIndex":4}},"2_2":{"19":{"parts":[[2,2,2],[1,1,2]],"parentId":"2_2","uid":"19","lives":3,"selected":false}},"3_1":{"5":{"parts":[[2,2,1],[2,2,2]],"parentId":"3_1","uid":"5","lives":3,"selected":false,"containerIndex":0},"6":{"parts":[[2,0,2],[2,2,2]],"parentId":"3_1","uid":"6","lives":3,"selected":false,"containerIndex":1}},"3_2":{},"4_1":{},"4_2":{}},"count":20,"storeCapacity":{"1":40,"5":-1,"2_1":5,"2_2":1,"3_1":5,"3_2":1,"4_1":5,"4_2":1},"selected":{"parentId":-1,"uid":-1}}'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('sampleStore test', () => {
  let samples = null
  beforeEach(() => {
    setActivePinia(createPinia())
    samples = samplesStore();
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Can have empty store added', () => {
    localStorageMock.getItem.mockReturnValue(null)
    samples.subscribe('1', 40)
    expect(Object.keys(samples.containerSamples('1')).length).toBe(0)
  })

  it('Can load count from storage', () => {
    localStorageMock.getItem.mockReturnValue(testSampleLoad)
    samples.init()
    expect(localStorageMock.getItem.mock.calls).toHaveLength(1);
    expect(samples.getTotalCreated).toBe(20)
  })


  it('Can reorder items in container', () => {
    localStorageMock.getItem.mockReturnValue(testSampleLoad)
    samples.init()
    samples.subscribe('2_1', 5)

    expect(samples.containerSamples("2_1")["7"].containerIndex).toBe(0)
    expect(samples.containerSamples("2_1")["8"].containerIndex).toBe(1)
    expect(samples.containerSamples("2_1")["9"].containerIndex).toBe(2)
    expect(samples.containerSamples("2_1")["10"].containerIndex).toBe(3)
    expect(samples.containerSamples("2_1")["11"].containerIndex).toBe(4)

    samples.toggleSelect("2_1", "7")
    samples.moveSelectedToContainer("merge-in", "2_1")

    expect(samples.containerSamples("2_1")["7"].containerIndex).toBe(0)
    expect(samples.containerSamples("2_1")["8"].containerIndex).toBe(1)
    expect(samples.containerSamples("2_1")["9"].containerIndex).toBe(2)
    expect(samples.containerSamples("2_1")["10"].containerIndex).toBe(3)
    expect(samples.containerSamples("2_1")["11"].containerIndex).toBe(4)

    samples.organiseContainer("2_1", [{"uid":"8","parentId":"2_1","containerIndex":1},{"uid":"9","parentId":"2_1","containerIndex":2},{"uid":"10","parentId":"2_1","containerIndex":3},{"uid":"11","parentId":"2_1","containerIndex":4},{"uid":"7","parentId":"2_1","containerIndex":0}])

    expect(samples.containerSamples("2_1")["7"].containerIndex).toBe(4)
    expect(samples.containerSamples("2_1")["8"].containerIndex).toBe(0)
    expect(samples.containerSamples("2_1")["9"].containerIndex).toBe(1)
    expect(samples.containerSamples("2_1")["10"].containerIndex).toBe(2)
    expect(samples.containerSamples("2_1")["11"].containerIndex).toBe(3)
  })

  it('Can move container', () => {
    localStorageMock.getItem.mockReturnValue(testSampleLoad)
    samples.init()
    samples.subscribe('2_1', 5)
    samples.subscribe('1', 40)

    expect(Object.keys(samples.containerSamples("1")).length).toBe(5)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(5)
    expect(samples.getSelected).toStrictEqual({ 'parentId': -1, "uid": -1 })

    samples.toggleSelect("2_1", "7")
    expect(samples.getSelected).toStrictEqual({ 'parentId': "2_1", "uid": "7" })
    samples.moveSelectedToContainer("spawn", "1")
    expect(samples.getSelected).toStrictEqual({ 'parentId': -1, "uid": -1 })

    expect(Object.keys(samples.containerSamples("1")).length).toBe(6)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(4)
  })

  it('Can reorder items in container and move', () => {
    localStorageMock.getItem.mockReturnValue(testSampleLoad)
    samples.init()
    samples.subscribe('2_1', 5)
    samples.subscribe('1', 40)

    expect(Object.keys(samples.containerSamples("1")).length).toBe(5)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(5)
    expect(samples.getSelected).toStrictEqual({ 'parentId': -1, "uid": -1 })

    samples.toggleSelect("2_1", "7")
    expect(samples.getSelected).toStrictEqual({ 'parentId': "2_1", "uid": "7" })
    samples.moveSelectedToContainer("merge-in", "2_1")
    expect(samples.getSelected).toStrictEqual({ 'parentId': -1, "uid": -1 })

    expect(Object.keys(samples.containerSamples("1")).length).toBe(5)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(5)

    samples.organiseContainer("2_1", [{"uid":"8","parentId":"2_1","containerIndex":1},{"uid":"9","parentId":"2_1","containerIndex":2},{"uid":"10","parentId":"2_1","containerIndex":3},{"uid":"11","parentId":"2_1","containerIndex":4},{"uid":"7","parentId":"2_1","containerIndex":0}])

    expect(Object.keys(samples.containerSamples("1")).length).toBe(5)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(5)

    samples.toggleSelect("2_1", "7")
    samples.moveSelectedToContainer("spawn", "1")

    console.log(samples.containerSamples("1"))
    console.log(samples.containerSamples("2_1"))
    expect(Object.keys(samples.containerSamples("1")).length).toBe(6)
    expect(Object.keys(samples.containerSamples("2_1")).length).toBe(4)
  })


})