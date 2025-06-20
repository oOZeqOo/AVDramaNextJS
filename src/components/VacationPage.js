import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const items = [
	{ value: 0, name: "Vietnam Vacation #1", url: "/vacations/vietnam_1" },
	{ value: 1, name: "Florida #1", url: "/vacations/florida_1" },
];

const VacationPage = () => {
  const router = useRouter();
  const [vacation, setVacation] = useState(items[0]);

  const handleChange = (event) => {
				setVacation(items[event.target.value]);
  };

  const goToVacation = (event) => {
    router.push(vacation?.url);
  };

  return (
			<div style={{ height: "100vh", backgroundColor: "lightgreen" }}>
				<div
					style={{
						backgroundColor: "lime",
						padding: 10,
						borderBottom: "1px solid black",
					}}
				>
					<Button
						variant="contained"
						onClick={() => router.back()}
						className="bg-blue-500"
					>
						Back
					</Button>
				</div>
				<div
					style={{
						padding: 10,
						height: 75,
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						verticalAlign: "middle",
						justifyContent: "center",
						alignItems: "middle",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: 5,
						}}
					>
						<Typography style={{ color: "black" }}>
							Select the Vacation to View
						</Typography>
					</div>
					<Box
						sx={{ minWidth: 100 }}
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: 5,
						}}
					>
						<FormControl>
							<InputLabel
								id="vacation-select-label"
								style={{ color: "black", marginTop: 6 }}
							>
								Vacation
							</InputLabel>
							<Select
								labelId="vacation-select-label"
								id="vacation-simple-select"
								value={vacation?.value}
								label="Vacation"
								onChange={handleChange}
								style={{ backgroundColor: "whitesmoke" }}
							>
								{items?.map((item, index) => (
									<MenuItem key={index} value={item?.value}>
										{item?.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: 5,
						}}
					>
						<Button
							variant="contained"
							onClick={goToVacation}
							className="bg-blue-500"
						>
							View Details
						</Button>
					</div>
				</div>
			</div>
		);
};

export default VacationPage;
