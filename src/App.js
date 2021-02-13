import React from "react";
import "./App.css";

const RED = "#d60f0f";
const YELLOW = "yellow";
const GREEN = "#0f570f";
const LIGHT_GREEN = "#0D8C0D";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedRow: 0,
      hoverIndex: 0,
      fields: {},
      rateArr: [
        {
          title: "Responsive",
          subtitle: [
            "Extremely Bad",
            "Bad",
            "Neutral",
            "Good",
            "Extremely Good"
          ],
          color: "",
          colored_box: 0
        },
        {
          title: "Competency in advising right solution",
          subtitle: [
            "Extremely Bad",
            "Bad",
            "Neutral",
            "Good",
            "Extremely Good"
          ],
          color: "",
          colored_box: 0
        },
        {
          title: "Trustworthiness",
          subtitle: [
            "Extremely Bad",
            "Bad",
            "Neutral",
            "Good",
            "Extremely Good"
          ],
          color: "",
          colored_box: 0
        },
        {
          title: "Customer service and support",
          subtitle: [
            "Extremely Bad",
            "Bad",
            "Neutral",
            "Good",
            "Extremely Good"
          ],
          color: "",
          colored_box: 0
        }
      ]
    };
  }
  mouseEnter = (index, row) => {
    this.setState({ hoverIndex: index, selectedRow: row });
  };
  click = (clickedIndex, title, clickedRow, color) => {
    let fields = this.state.fields;
    let rateArr = this.state.rateArr;
    rateArr[clickedRow - 1].color = color;
    rateArr[clickedRow - 1].colored_box = clickedIndex;
    fields[title] = clickedIndex;
    this.setState({ fields, rateArr });
  };
  disabledButton() {
    if (
      !this.state.fields["Responsive"] ||
      !this.state.fields["Competency in advising right solution"] ||
      !this.state.fields["Trustworthiness"] ||
      !this.state.fields["Customer service and support"]
    ) {
      return true;
    }
    return false;
  }
  showResult = () => console.log(this.state.fields);

  render() {
    let background;
    if (this.state.hoverIndex == 1) {
      background = RED;
    } else if (this.state.hoverIndex == 2) {
      background = RED;
    } else if (this.state.hoverIndex == 3) {
      background = YELLOW;
    } else if (this.state.hoverIndex == 4) {
      background = LIGHT_GREEN;
    } else if (this.state.hoverIndex == 5) {
      background = GREEN;
    }
    return (
      <div className="App">
        <header>
          <img src="https://prod-credit-card.s3.ap-south-1.amazonaws.com/bajajcapital/LA%2520premier%2520new%2520Logo%5B1%5D.png" />
          <h4>
            Please rate your satisfaction on the following attributes of our
            service
          </h4>
        </header>
        <div className="container">
          {this.state.rateArr.map((i, key) => {
            return (
              <React.Fragment key={key}>
                <h5>{i.title}</h5>
                <div className="rating__bar">
                  {i.subtitle.map((j, index) => {
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => this.mouseEnter(index + 1, key + 1)}
                        onClick={() =>
                          this.click(index + 1, i.title, key + 1, background)
                        }
                        style={{
                          backgroundColor: i.color
                            ? i.colored_box >= index + 1 && i.color
                            : this.state.selectedRow == key + 1 &&
                              this.state.hoverIndex >= index + 1 &&
                              background
                        }}
                      >
                        <span>{j}</span>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
          <button
            disabled={this.disabledButton()}
            style={{
              backgroundColor: this.disabledButton() ? "#a9a9a9" : GREEN
            }}
            onClick={() => this.showResult()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
