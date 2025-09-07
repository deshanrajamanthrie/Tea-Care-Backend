import joblib
import pandas as pd

pipe = joblib.load("model.pkl")

sample = pd.DataFrame([{
    "grade":"BOPF", "month":9, "rainfall":120, "temperature":22, "prev_price":250
}])

pred = pipe.predict(sample)[0]
print(f"Predicted price: Rs {pred:.2f}/kg")
