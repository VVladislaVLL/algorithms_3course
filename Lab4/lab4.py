import numpy as np
import matplotlib.pyplot as plt

path_distance = lambda route, c: np.sum([np.linalg.norm(c[route[p]] - c[route[p - 1]]) for p in range(len(route))])


# https://en.wikipedia.org/wiki/2-opt
# procedure 2optSwap(route, i, k) {
#    1. take route[0] to route[i-1] and add them in order to new_route
#    2. take route[i] to route[k] and add them in reverse order to new_route
#    3. take route[k+1] to end and add them in order to new_route
#    return new_route;
# }

# Example route: A → B → C → D → E → F → G → H → A
# Example parameters: i = 4, k = 7 (starting index 1)
# Contents of new_route by step:
# (A → B → C)
# A → B → C → (G → F → E → D)
# A → B → C → G → F → E → D → (H → A)
two_opt_swap = lambda route, i, k: np.concatenate((route[0:i], route[k:-len(route) + i - 1 : -1], route[k + 1 : len(route)]))

def two_opt(cities, improvement_threshold):
    # Создание массив, где номера строк соответсвуют городам
    route = np.arange(cities.shape[0])
    improvement_factor = 1
    best_distance = path_distance(route,cities)

    while improvement_factor > improvement_threshold:
        distance_to_beat = best_distance
        for swap_first in range(1, len(route) - 2):
            for swap_last in range(swap_first + 1,len(route)):
                new_route = two_opt_swap(route, swap_first, swap_last)
                new_distance = path_distance(new_route, cities)
                if new_distance < best_distance:
                    route = new_route 
                    best_distance = new_distance
        improvement_factor = 1 - best_distance / distance_to_beat
    return route 


if __name__ == '__main__':
    cities = np.random.RandomState(42).rand(70,2)
    route = two_opt(cities,0.001)  
    new_cities_order = np.concatenate((np.array([cities[route[i]] for i in range(len(route))]), np.array([cities[0]])))
    plt.scatter(cities[:,0],cities[:,1])
    plt.plot(new_cities_order[:,0],new_cities_order[:,1])
    plt.show()
    print("Путь: " + str(route) + "\n\Расстояние: " + str(path_distance(route,cities)))