import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GET_API_TODOS } from '../Api/Api';
import { getAuthToken } from '../utils/Auth';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const authToken = getAuthToken();

    useEffect(() => {
        // Fetch todos from the backend upon component mount
        const fetchTodos = async () => {
            try {
                if (authToken) {
                    const response = await axios.get(GET_API_TODOS, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setTodos(response.data);
                }

            } catch (error) {
                // Handle error while fetching todos
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Todos</h1>
            {/* Display todos */}
        </div>
    );
}

export default Todo;