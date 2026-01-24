import React, { useState, useEffect } from 'react';
import './MindMap.css';
import mindMapData from '../data/mindMapData';

// Recursive Node Component
const MindMapNode = ({ node, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mindmap-node-group">
            <div className="mindmap-node-wrapper">
                <div 
                    className={`mindmap-node level-${level} ${level === 0 ? 'root' : ''}`}
                    onClick={hasChildren ? toggleExpand : undefined}
                >
                    {node.label}
                    {hasChildren && (
                        <div className="node-toggle">
                            {isExpanded ? '−' : '+'}
                        </div>
                    )}
                </div>
            </div>

            {hasChildren && (
                <div className={`mindmap-children ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    {node.children.map((child) => (
                        <MindMapNode key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Main Mind Map Component
const MindMap = ({ month }) => {
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        const currentData = mindMapData.find(m => m.month === month);
        if (currentData) {
            setMapData(currentData.data);
        } else {
            setMapData(null);
        }
    }, [month]);

    if (!mapData) {
        return (
            <div className="mindmap-container">
                <p className="mindmap-empty">Chưa có sơ đồ tư duy cho tháng này</p>
            </div>
        );
    }

    return (
        <div className="mindmap-container">
            <div className="mindmap-title">Sơ đồ tư duy: Tháng {month}</div>
            <div className="mindmap-tree">
                <MindMapNode node={mapData} level={0} />
            </div>
        </div>
    );
};

export default MindMap;
