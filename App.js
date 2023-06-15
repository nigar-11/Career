import "./App.css";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

var defaultData = [
  {
    id: 1,
    title: "Profile Summary",
    isTicked: false,
  },
  {
    id: 2,
    title: "Academic and Cocurricular Achievements",
    isTicked: false,
  },
  {
    id: 3,
    title: "Summer internship Experience",
    isTicked: false,
  },
  {
    id: 4,
    title: "Work Experience",
    isTicked: false,
  },
  {
    id: 5,
    title: "Projects",
    isTicked: false,
  },
  {
    id: 6,
    title: "Certifications",
    isTicked: false,
  },
  {
    id: 7,
    title: "Leadership Positions",
    isTicked: false,
  },
  {
    id: 8,
    title: "Extracirricular",
    isTicked: false,
  },
  {
    id: 9,
    title: "Education",
    isTicked: false,
  },
];

function App() {
  const [listData, setListData] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    })
  );

  useEffect(() => {
    const localListData = JSON.parse(localStorage.getItem("listData"));
    if (!localListData) {
      localStorage.setItem("listData", JSON.stringify(defaultData));
      setListData(defaultData);
    } else {
      setListData(localListData);
    }
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.title !== over.id.title) {
      setListData((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  return (
    <>
      {listData && (
        <div style={{ width: "80%" }}>
          <h1
            className="w-full text-center"
            style={{
              marginTop: "58px",
              marginBottom: "44px",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "40px",
            }}
          >
            Select your sections
          </h1>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={listData}
              strategy={verticalListSortingStrategy}
            >
              {/* We need components that use the useSortable hook */}
              {listData.map((language) => {
                return <SortableItem key={language.title} id={language} />;
              })}
            </SortableContext>
          </DndContext>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "32px",
              marginBottom: "44px",
            }}
          >
            <button
              style={{
                backgroundColor: "#8A4893",
                width: "429px",
                height: "52px",
                borderRadius: "10px",
                color: "#fff",
                gap: "10px",
              }}
              onClick={() => {
                var cards = document.getElementsByClassName("card");
                var list = [];
                for (var i = 0; i < cards.length; i++) {
                  list.push({
                    title: cards[i].childNodes[2].childNodes[0].innerHTML,
                    isTicked: cards[i].childNodes[4].childNodes[0].checked,
                  });
                }
                localStorage.setItem("listData", JSON.stringify(list));
              }}
            >
              {"Save and Next"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
